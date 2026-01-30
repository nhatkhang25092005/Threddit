export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const [year, month, day] = dateString.split('-')
  return `${day}-${month}-${year}`
}

/**
 * Format a malformed date string to yyyy-mm-dd format
 * Handles format: "05T17:00:00.000Z-01-2025" -> "2025-01-05"
 */
export const formatToYYYYMMDD = (dateStr) => {
  if (!dateStr) return null;

  try {
    // Handle malformed format: "05T17:00:00.000Z-01-2025"
    const malformedPattern = /(\d{2})T[\d:.]+Z-(\d{2})-(\d{4})/;
    const match = dateStr.match(malformedPattern);
    
    if (match) {
      const [_, day, month, year] = match;
      return `${year}-${month}-${day}`;
    }

    // Handle standard ISO format
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }

    return null;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

/**
 * Format Date object to yyyy-mm-dd
 */
export const dateToYYYYMMDD = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Parse malformed date string to Date object
 */
export const parseMalformedDate = (dateStr) => {
  if (!dateStr) return null;

  try {
    const malformedPattern = /(\d{2})T([\d:.]+)Z-(\d{2})-(\d{4})/;
    const match = dateStr.match(malformedPattern);
    
    if (match) {
      const [_, day, time, month, year] = match;
      const isoFormat = `${year}-${month}-${day}T${time}Z`;
      return new Date(isoFormat);
    }

    return new Date(dateStr);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

/**
 * Validate and format any date input to yyyy-mm-dd
 */
export const normalizeDate = (input) => {
  if (!input) return null;

  // If it's already a Date object
  if (input instanceof Date) {
    return dateToYYYYMMDD(input);
  }

  // If it's a string
  if (typeof input === 'string') {
    return formatToYYYYMMDD(input);
  }

  return null;
};

export function convertTime(timeString) {
    const date = new Date(timeString);
    const now = new Date();

    const diffInMs = now - date
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if(diffInSeconds < 60) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tuần trước`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} tháng trước`;
    return `${Math.floor(diffInDays / 365)} năm trước`;
}

// Usage examples:
// formatToYYYYMMDD("05T17:00:00.000Z-01-2025") // "2025-01-05"
// formatToYYYYMMDD("2025-01-05T17:00:00.000Z") // "2025-01-05"
// dateToYYYYMMDD(new Date()) // "2025-01-15"
// parseMalformedDate("05T17:00:00.000Z-01-2025") // Date object
// normalizeDate("05T17:00:00.000Z-01-2025") // "2025-01-05"