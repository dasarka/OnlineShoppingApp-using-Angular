import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  let databaseModule: DatabaseModule;

  beforeEach(() => {
    databaseModule = new DatabaseModule();
  });

  it('should create an instance', () => {
    expect(databaseModule).toBeTruthy();
  });
});
