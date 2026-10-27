export interface AuditLog {
  id?: number;
  actorEmail?: string;
  actorRole?: string;
  action: string;
  entityName?: string;
  entityId?: number;
  details?: string;
  timestamp?: string;
}
