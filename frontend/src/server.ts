import { createNodeRequestHandler } from '@angular/ssr/node';
import express from 'express';

const app = express();

/**
 * Karena proyek ini TIDAK menggunakan SSR, routing Angular,
 * maupun Express backend, server hanya dibuat sebagai stub
 * agar tidak menyebabkan error build.
 */
export const reqHandler = createNodeRequestHandler(app);
