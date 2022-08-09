declare namespace leadgen {
  type Kind =
    | 'paragraph'
    | 'integer'
    | 'decimal'
    | 'file'
    | 'datetime'
    | 'multiple_choice'
    | 'dropdown'
    | 'number'
    | 'checkbox';

  type SubKind = '' | 'file_extension' | 'date' | 'time' | 'datetime';

  type Source = {
    source: 'ekyc' | 'input';
    field: string;
  };

  type Options = {
    title: string;
    value: string | number;
  };

  type Field = {
    question: string;
    kind: Kind;
    required: boolean;
    source: Source;
    sub_kind?: SubKind;
    custom_kind?: string;
    min?: string;
    max?: string;
    options?: Options[];
    section_id: string;
    _index?: number; // FE mapping
  };

  type Form = {
    app_identifier: string;
    created_at: string;
    description: string;
    fields: AppField[];
    id: string;
    rule: string;
    rule_time: number;
    status: string;
    title: string;
    sections: AppSection[];
  };

  type Section = {
    id: string;
    index: number;
    name: string;
  };

  type Value = string | number | string[] | number[];

  type AppField = Field & {
    value: Value;
  };

  type AppSection = Section & {
    fields: AppField[];
  };
}