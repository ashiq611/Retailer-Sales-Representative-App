To support 1M+ retailers, the system uses normalized data models and proper indexing
(name, uid, phone, region, area, distributor, territory). Heavy read operations are
cached using Redis with short TTL, reducing database pressure under high concurrency.  

Retailer list and detail APIs use Prisma transactions to avoid N+1 queries and return
consistent pagination metadata. The app is stateless and suitable for horizontal scaling
with load balancing. PostgreSQL can later be expanded with read replicas. CSV imports and
bulk operations can be offloaded to worker queues to keep the API responsive.
