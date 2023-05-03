

export function isWrapVariable(text: string) {
  return text.trimStart().startsWith('${{') && text.trimEnd().endsWith('}}');
}

export function wrapVariable(variable: string) {
  if(isWrapVariable(variable)) return variable;
  return `\${{ ${variable} }}`;
}

export function unwrapVariable(variable?: string) {
  if(variable === undefined) return '';
  if(!isWrapVariable(variable)) return variable;
  return variable.trim().slice(3, -2).trim();
}

export function isParentheses(text: string) {
  return text.trimStart().startsWith('(') && text.trimEnd().endsWith(')');
}

export function unwrapParentheses(text?: string) {
  if(text === undefined) return '';
  if(isParentheses(text)) {
    return text.trim().slice(1, -1).trim();
  }
  return text;
}

/**
 * Convert to string using JSON format via `JSON.stringify`
 * @param text
 * @returns
 */
export function stringify(text: unknown){
  return JSON.stringify(text);
}
