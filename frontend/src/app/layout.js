'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import ErrorBoundary from './components/ErrorBoundary';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
              <div className="container mx-auto px-6 py-4">
                <h1 className="text-3xl font-bold">Employee Management System</h1>
              </div>
            </header>
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
            <footer className="bg-gray-800 text-white text-center py-4">
              <p>© 2025 Employee Management System. All rights reserved.</p>
            </footer>
          </ApolloProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
