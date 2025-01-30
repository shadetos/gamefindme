import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/games', async (req: Request, res: Response): Promise<void> => {
  try {
    const steamApiKey = process.env.STEAM_API_KEY;

    if (!steamApiKey) {
      console.error('❌ Missing Steam API key in .env');
      res.status(500).json({ message: 'Missing Steam API key in .env' });
      return;
    }

    const topGamesUrl = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;
    const popularGamesUrl = `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?key=${steamApiKey}`;

    const [gameListResponse, popularGamesResponse] = await Promise.all([
      axios.get(topGamesUrl),
      axios.get(popularGamesUrl),
    ]);

    if (!gameListResponse.data?.applist?.apps || !popularGamesResponse.data?.response?.ranks) {
      console.error('❌ Unexpected response format from Steam API');
      res.status(500).json({ message: 'Invalid data received from Steam API.' });
      return;
    }

    type Game = { appid: number; name: string };

    const popularGames: number[] = popularGamesResponse.data.response.ranks
      .map((game: { appid: number }) => game.appid)
      .slice(0, 50);

    const games: Game[] = gameListResponse.data.applist.apps.filter((game: Game) =>
      popularGames.includes(game.appid)
    );

    res.json({ games });
  } catch (error) {
    console.error('❌ Error fetching Steam API:', error);
    res.status(500).json({ message: 'Failed to fetch games from Steam API.' });
  }
});

export default router;
