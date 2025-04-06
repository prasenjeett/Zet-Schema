import { ZetIssue } from './types';

export class ZetError extends Error {
  issues: ZetIssue[];

  constructor(issues: ZetIssue[]) {
    super('Validation failed');
    this.name = 'ZetError';
    this.issues = issues;
  }

  format() {
    return this.issues.reduce((acc, issue) => {
      let current = acc;
      for (const key of issue.path) {
        current[key] = current[key] || {};
        current = current[key];
      }
      current.message = issue.message;
      return acc;
    }, {} as Record<string, any>);
  }

  toString() {
    return `ZetError: ${this.issues.map(i => 
      `[${i.path.join('.')}] ${i.message}`
    ).join(', ')}`;
  }
}