const dbConfig = {
    type: 'postgres',
    database: 'qzqgbckb',
    host: 'tyke.db.elephantsql.com',
    username: 'qzqgbckb',
    password: 'MW5KJ4IPetGJ8aJ-SXRNVrIzC1NoO1D7',
    synchronize: false
}

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig,{
            entities: ['**/*.entity.js'],
        })
        break;
    case 'test':
        Object.assign(dbConfig,{
            entities: ['**/*.entity.ts'],
        })
        break;
    case 'production':
        Object.assign(dbConfig,{
            entities: ['**/*.entity.js'],
        })
    default:
        throw new Error('unknown environment');
}
module.exports = dbConfig;