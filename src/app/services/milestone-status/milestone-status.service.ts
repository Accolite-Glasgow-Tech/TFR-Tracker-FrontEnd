import { Injectable } from '@angular/core';
import { ROUTER_CONFIGURATION } from '@angular/router';

enum status {
  INTENT = 'INTENT',
  IN_PROGRESS = 'IN PROGRESS',
  PENDING_REVIEW = 'PENDING REVIEW',
  REVIEW_FAILED = 'REVIEW FAILED',
  APPROVED = 'APPROVED',
}
@Injectable({
  providedIn: 'root',
})
export class MilestoneStatusService {
  getNextStatus(currentStatus: string): status[] {
    switch (currentStatus) {
      case status.INTENT:
        return [status.INTENT, status.IN_PROGRESS];
      case status.IN_PROGRESS:
        return [status.IN_PROGRESS, status.PENDING_REVIEW];
      case status.PENDING_REVIEW:
        return [status.PENDING_REVIEW, status.REVIEW_FAILED, status.APPROVED];
      case status.REVIEW_FAILED:
        return [status.REVIEW_FAILED, status.IN_PROGRESS];
      case status.APPROVED:
        return [];
      default:
        throw new Error('bad status passed');
    }
  }
  constructor() {}
}
