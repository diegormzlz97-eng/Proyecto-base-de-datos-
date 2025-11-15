
// Convierte UUID string → Buffer (binario)
export function uuidToBuffer(uuid) {
  return Buffer.from(uuid.replace(/-/g, ""), "hex");
}

// Convierte Buffer (binario) → UUID string
export function bufferToUuid(buffer) {
  const hex = buffer.toString("hex");
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20)
  ].join("-");
}