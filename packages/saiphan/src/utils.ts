

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
