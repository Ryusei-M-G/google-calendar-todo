import { Request, Response } from 'express';
import { getPool } from './db';
import { google } from 'googleapis';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
    email?: string;
    name?: string;
  }
}

// DB プールは共通モジュールから取得

const getCalendarEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    // セッションからuserIdを取得
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // userIdを使ってDBからtokenを取得
    const userQuery = 'SELECT access_token, refresh_token FROM users WHERE id = $1';
    const userResult = await getPool().query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { access_token, refresh_token } = userResult.rows[0];

    if (!access_token) {
      res.status(401).json({ error: 'No access token found' });
      return;
    }

    // OAuth2クライアントを設定
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });

    // Google Calendar APIでイベントを取得
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    // イベントを選定して返す
    const formattedEvents = events.map(event => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
      location: event.location,
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Calendar event fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
};

export default getCalendarEvent;
