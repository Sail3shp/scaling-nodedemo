import { rateLimit } from 'express-rate-limit'

export const getLimiter = rateLimit({
    windowMs: 1*60*1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})

export const postLimiter = rateLimit({
   windowMs: 1*60*1000, //1 min for test purpose
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56 
})