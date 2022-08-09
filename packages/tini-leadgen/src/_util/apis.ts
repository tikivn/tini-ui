export const graphql = async (
  query: string,
  variables: Record<string, string | number>,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    my.request({
      url: 'https://api.tala.xyz/miniapp/api/graphql/query',
      method: 'POST',
      data: {
        query,
        variables,
      },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TikiNative',
      },
      success: (res: any) => {
        if (res.errors && res.errors.length) {
          return reject(res.errors);
        }
        resolve(res.data);
      },
      fail: reject,
    });
  });
};

export const getForm = async ({ id }: { id: string }): Promise<leadgen.Form> => {
  try {
    const query = `query FormGet($id: GlobalID!) {
      form_get(id: $id) {
        id
        app_identifier
        title
        description
        status
        rule
        rule_time
        created_at
        sections {
          id
          name
          index
        }
        fields {
          ... on ParagraphField {
            question
            kind
            required
            custom_kind
            kind
            source {
              source
              field
            }
            section_id
            pValue: value
          }
          ... on NumberField {
            question
            kind
            required
            custom_kind
            kind
             source {
              source
              field
            }
            nMin: min
            nMax: max
            nValue: value
            section_id
          }
          ... on DatetimeField {
            question
            kind
            required
            custom_kind
            kind
             source {
              source
              field
            }
            dtMin: min
            dtMax: max
            dtValue: value
            section_id
          }
           ... on FileField {
            question
            kind
            required
            sub_kind
            custom_kind
            kind
             source {
              source
              field
            }
            fValue: value
            section_id
          }
          ... on MultipleChoiceField {
            question
            kind
            required
            custom_kind
            kind
             source {
              source
              field
            }
            options {
              title
              selected
            }
            mValue: value
            section_id
          }
          ... on DropdownField {
            question
            kind
            required
            custom_kind
            kind
             source {
              source
              field
            }
            options {
              title
              selected
            }
            dValue: value
            section_id
          }
           ... on CheckboxField {
            question
            kind
            required
            custom_kind
            kind
             source {
              source
              field
            }
            options {
              title
              selected
            }
            cValue: value
            section_id
          }
        }
      }
    }`;
    const rs = await graphql(query, { id });
    const form = rs.form_get;
    return {
      ...form,
      fields: form.fields.map((field: leadgen.Field, _index: number) => ({ ...field, _index })),
    };
  } catch (error) {
    console.error('Get Form Error', error);
    return null;
  }
};
