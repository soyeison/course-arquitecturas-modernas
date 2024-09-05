import { TennisMatchDTO } from '../../../../core/tennis-match/domain/dto/TennisMatchDto';

export interface DbPort {
  upsertMatch(match: TennisMatchDTO): void;
  updateStatus(matchId: string, status: string): void;
}
