ด้านล่างนี้เป็น Starter Template สำหรับโปรเจค Node.js พร้อม TypeScript, Express.js, Swagger, และ Prisma ที่เชื่อมต่อกับ PostgreSQL:

1. **โครงสร้างของโปรเจค**:
   ```
   project/
   ├── src/
   │   ├── routes/
   │   │   └── index.ts
   │   ├── prisma/
   │   │   └── schema.prisma
   │   ├── controllers/
   │   │   └── exampleController.ts
   │   ├── middlewares/
   │   │   └── errorHandler.ts
   │   ├── utils/
   │   │   └── logger.ts
   │   ├── app.ts
   │   └── server.ts
   ├── prisma/
   │   └── dev.db (empty database)
   ├── .env
   ├── package.json
   ├── tsconfig.json
   ├── swagger.json
   └── README.md
   ```

2. **Starter Template Code**:

```typescript
// src/app.ts
import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerDocument from '../swagger.json';

const app: Application = express();

app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export default app;
```

```typescript
// src/server.ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

```typescript
// src/routes/index.ts
import { Router } from 'express';
import exampleController from '../controllers/exampleController';

const router = Router();

router.get('/example', exampleController.getExample);

export default router;
```

```typescript
// src/controllers/exampleController.ts
import { Request, Response } from 'express';

const getExample = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Example endpoint working!' });
};

export default { getExample };
```

```typescript
// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
};
```

```typescript
// src/utils/logger.ts
export const logger = {
    info: (message: string) => console.log(`INFO: ${message}`),
    error: (message: string) => console.error(`ERROR: ${message}`),
};
```

```prisma
// src/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

```json
// package.json
{
  "name": "node-typescript-express-swagger-prisma",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "express": "^4.18.2",
    "swagger-ui-express": "^4.5.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.2",
    "prisma": "^5.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4"
  }
}
```

```json
// .env
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
PORT=3000
```

3. **คำแนะนำเพิ่มเติม**:
- ติดตั้ง dependencies:
  ```bash
  npm install
  npm install -g prisma
  ```
- สร้าง Prisma Client:
  ```bash
  npx prisma generate
  ```
- รันโครงการ:
  ```bash
  npm run dev
  ```

**a.** ต้องการเพิ่ม Unit Test โดยใช้ Jest หรือไม่?  
**b.** อยากให้เพิ่มตัวอย่างการใช้ Swagger Document (Swagger Spec) เพิ่มเติมไหม?