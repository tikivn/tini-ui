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
          }
        }
      }
    }`;
    const rs = await graphql(query, { id });
    return rs.form_get;
  } catch (error) {
    console.error('Get Form Error', error);
    return null;
  }
};
