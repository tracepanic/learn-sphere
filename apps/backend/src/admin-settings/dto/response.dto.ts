export class GetGeneralSettingsRes {
  readonly name: string;
  readonly description: string | null;
  readonly website: string | null;
}

export class UpdateGeneralSettingsRes extends GetGeneralSettingsRes {}
