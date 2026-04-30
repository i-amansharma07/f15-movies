# MovieDB - TMDB Movie Discovery App

A modern, responsive movie discovery application built with Next.js that leverages The Movie Database (TMDB) API to provide users with comprehensive movie information, search capabilities, and personalized watchlists.

## Features

- **Movie Discovery**: Browse trending, popular, and top-rated movies
- **Advanced Search**: Find movies by title, genre, or keywords
- **Detailed Movie Information**: View comprehensive movie details including cast, crew, ratings, and trailers
- **Watchlist Management**: Create and manage your personal movie watchlist
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with Next.js for optimal loading speeds and SEO

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: The Movie Database (TMDB) API
- **State Management**: React Server Components and Actions

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- TMDB API Key (get one at [TMDB](https://www.themoviedb.org/settings/api))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   - Copy the `.env` file and update it with your TMDB API credentials:
   ```bash
   cp .env .env.local
   ```
   - Get your API key from [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Update the following variables in `.env.local`:
     ```
     API_READ_ACCESS_TOKEN=your_tmdb_access_token_here
     API_KEY=your_tmdb_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

- **Home Page**: Discover trending movies and featured content
- **Search**: Use the search bar to find specific movies
- **Movie Details**: Click on any movie card to view detailed information
- **Watchlist**: Add movies to your watchlist for later viewing

## Project Structure

```
movie/
├── actions/          # Server actions for API calls
├── app/             # Next.js app router pages
├── components/      # Reusable React components
├── lib/             # Utility functions
├── types/           # TypeScript type definitions
├── public/          # Static assets
└── data/            # Dummy data and constants
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Ensure all tests pass before submitting PR
- Update documentation as needed

## API Reference

This project uses The Movie Database (TMDB) API. For more information about available endpoints, visit the [TMDB API Documentation](https://developers.themoviedb.org/3/getting-started/introduction).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!
