// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { Checklist } from '../models/checklist';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private STORAGE_KEY = 'asvs_checklist_progress';
  private memoryStorage: string | null = null; 

  constructor() { }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined' && localStorage !== null;
    } catch {
      return false;
    }
  }

  saveProgress(checklist: Checklist): void {
    try {
      const json = JSON.stringify(checklist);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.STORAGE_KEY, json);
      } else {
        this.memoryStorage = json; 
      }
    } catch (error) {
    }
  }

  loadProgress(): Checklist | null {
    try {
      let json: string | null = null;
      if (this.isLocalStorageAvailable()) {
        json = localStorage.getItem(this.STORAGE_KEY);
      } else {
        json = this.memoryStorage;
      }

      if (json) {
        const data = JSON.parse(json);
        return new Checklist(data);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  clearProgress(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.STORAGE_KEY);
    } else {
      this.memoryStorage = null;
    }
  }

  autoSave(checklist: Checklist): void {
    setTimeout(() => {
      this.saveProgress(checklist);
    }, 30000);
  }
}