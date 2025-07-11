import { LyzrApiRequest, LyzrApiResponse } from '@/types';

const API_ENDPOINT = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
const API_KEY = 'sk-default-9BsmbXgZRPqWgKPKqmGEUzO8qeWPHdiw';
const USER_ID = 'alastair.horn@transformationsolutions.co.uk';
const AGENT_ID = '686588c437f3156844594c7f';
const SESSION_ID = '686588c437f3156844594c7f-0p8bwmg9umtb';

export class LyzrApiService {
  static async sendMessage(message: string): Promise<LyzrApiResponse> {
    try {
      const requestData: LyzrApiRequest = {
        message,
        user_id: USER_ID,
        agent_id: AGENT_ID,
        session_id: SESSION_ID,
      };

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: LyzrApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Lyzr API Error:', error);
      throw error;
    }
  }
}