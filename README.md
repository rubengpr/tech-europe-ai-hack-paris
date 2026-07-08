# Robbie

AI-powered parcel intelligence prototype built during the Tech Europe Paris AI Hackathon.

Robbie helps a demo farmer understand what is happening across their land parcels by combining parcel data, weather, public updates, and AI-generated explanations in one dashboard.

## AI Capabilities

- **Parcel assistant:** answers questions about parcel status, risks, weather, crops, and recommended next actions.
- **AI summaries:** turns mixed parcel signals into short, farmer-friendly explanations.
- **Voice flow with SLNG:** uses SLNG as a speech-to-text-to-speech layer so the assistant can support spoken briefings and voice-style interactions.
- **Web/document intelligence with Tavily:** uses Tavily to search the internet, find relevant public documents or official updates, and return useful structured context.
- **Briefing generation:** creates concise daily-style summaries from parcel, weather, public document, and restriction data.

## Hackathon Context

This was built as a fast prototype for the Tech Europe Paris AI Hackathon. The focus was a clear demo: show how AI can help farmers move from scattered agricultural data to practical decisions.

Some data is mocked or simplified where real integrations would have slowed down the hackathon build.

## Data Represented

- Parcel and crop data
- Weather signals
- Water restriction information
- Public documents and official updates
- Satellite, sensor, and drone-style observations

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- OpenAI
- SLNG
- Tavily

## Status

Hackathon prototype preserved as a snapshot of the project built in Paris.
