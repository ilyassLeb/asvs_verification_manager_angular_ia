import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

 
  private model = 'llama-3.1-8b-instant'; 
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey = environment.apiKey; 

  constructor(private http: HttpClient) {}

  private async callAi(prompt: string): Promise<string> {
  this.isLoadingSubject.next(true);
  try {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Organization-Id': environment.organizationId  // <-- ici
    });

    const payload = {
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    };

    const response: any = await firstValueFrom(
      this.http.post(this.apiUrl, payload, { headers })
    );

    return response?.choices?.[0]?.message?.content ?? 'No response generated.';
  } catch (err: any) {
    console.error(err);
    return `Error: ${err.message || 'Unable to connect to Groq API'}`;
  } finally {
    this.isLoadingSubject.next(false);
  }
}

  async getExplanation(text: string): Promise<string> {
    return this.callAi(`Explain simply this requirement: "${text}"`);
  }

  async getBestPractices(text: string): Promise<string> {
    return this.callAi(`Provide best practices for: "${text}"`);
  }

  async getCodeExample(text: string, language: string = 'C#'): Promise<string> {
    return this.callAi(`Provide a ${language} code example for: "${text}"`);
  }

  async getTestingGuidance(text: string): Promise<string> {
    return this.callAi(`Provide testing guidance for: "${text}"`);
  }
}