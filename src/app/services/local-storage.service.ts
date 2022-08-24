import { Injectable } from '@angular/core';

export enum KeyType {
  DATA = 'DATA',
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  /**
   * Verifica se existe uma chave salva no localstorage.
   * @param {KeyType} key Chave de acesso para consulta no localstorage.
   */
  public has(key: KeyType): boolean {
    return key in localStorage;
  }

  /**
   * Salva um conteúdo no localstorage no formato JSON.
   * @param {KeyType} key Chave de acesso para salvar o conteúdo no localstorage.
   */
  public set(key: KeyType, value: any): void {
    this.remove(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Traz um conteúdo do localstorage no formato JSON e retorna como objeto JS.
   * @param {KeyType} key Chave de acesso para trazer o conteúdo do localstorage.
   */
  public get(key: KeyType): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  /**
   * Remove um conteúdo do localstorage.
   * @param {KeyType} key Chave de acesso para remover o conteúdo do localstorage.
   */
  public remove(key: KeyType): void {
    localStorage.removeItem(key);
  }

  /**
   * Reseta o localstorage.
   */
  public clear() {
    localStorage.clear();
  }
}
