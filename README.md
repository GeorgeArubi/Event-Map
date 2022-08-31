# Radar Event Map with Next.js, Typescript, Radar API, Deck.GL, and TailwindCSS

This application uses the Radar API to generate place entry events based on Radar's category data,
and then render those events on a map. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Category Data
For this project, I wrote a simple python web scrapper to get the [top-level category slugs](https://radar.com/documentation/places/categories)
and send it to a JSON file. The script is located in the `/miscellaneous` directory.

## Error Handling
In order to handle empty events, i.e., in cases where a category does not have corresponding event data, 
I used the [react-toastify](https://fkhadra.github.io/react-toastify/introduction) library to display error messages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.