export function joinMessages(...messages: any[]): string {
  if (!Array.isArray(messages)) {
    return '';
  }

  if (messages.length === 1 && Array.isArray(messages[0])) {
    messages = messages[0];
  }

  return messages
    .map((item: any) => _stringify(item))
    .join('\n');
}


/**
 * Used only in joinMessages().
 */
export function _stringify(value: any): string {
  if (typeof value === 'string' || typeof value === 'number' || typeof  value === 'boolean') {
    return '' + value;
  }

  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  // case: Error object.
  if (value instanceof Error) {
    return '`' + value.message + '`';
  }

  // case: other object.
  let str = '';
  try {
    // pretty format and surround with ``` (improve visibility for slack message).
    str = '```' + JSON.stringify(value, null, 2) + '```';
  } catch (_e) {
    str = '``` JSON stringify error ```';
  }

  return str;
}
