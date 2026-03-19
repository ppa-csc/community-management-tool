FROM cypress/included:15.5.0

WORKDIR /e2e

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY cypress.config.ts tsconfig.json ./
COPY cypress/ ./cypress/

ENTRYPOINT ["npx", "cypress", "run", "--browser", "electron"]
