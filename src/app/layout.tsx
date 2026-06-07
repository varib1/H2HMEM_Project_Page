import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'H2HMem | A Multimodal Memory Benchmark',
  description:
    'H2HMem: A Multimodal Memory Benchmark for Agents in Human-Human Interactions. Evaluating memory recall, reasoning, and application in complex multi-party dialogues.',
  keywords: [
    'H2HMem',
    'multimodal memory',
    'benchmark',
    'LLM agents',
    'human-human interaction',
    'memory evaluation',
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
