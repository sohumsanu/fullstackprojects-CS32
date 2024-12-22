/**
 * Creates a table JSX element from JSON data.
 * @param {any} data - The JSON data to convert into a table.
 * @returns {JSX.Element[]} - The JSX elements representing the table.
 */
export function createTableFromJSON(data: any): JSX.Element[] {
  const table: JSX.Element[] = [];

  if (Array.isArray(data.data)) {
    const dataArray = data.data;

    // Assuming the first row contains column names
    const headers: string[] = dataArray[0];

    // Create the table header
    const headerRow = headers.map((header: string, index: number) => (
      <th key={index}>{header}</th>
    ));
    table.push(<tr key="header">{headerRow}</tr>);

    // Create the table rows
    for (let i = 1; i < dataArray.length; i++) {
      const item = dataArray[i];
      const row = item.map((value: string, columnIndex: number) => (
        <td key={columnIndex}>{value}</td>
      ));
      table.push(<tr key={i}>{row}</tr>);
    }
  }

  return table;
}

/**
 * Creates a table JSX element from broadband JSON data.
 * @param {any} data - The broadband JSON data to convert into a table.
 * @returns {JSX.Element[]} - The JSX elements representing the table.
 */
export function createTableFromBroadbandJSON(data: any): JSX.Element[] {
  const table: JSX.Element[] = [];

  if (typeof data === "object") {
    const keys = Object.keys(data);

    if (keys.length > 0) {
      const headers: string[] = keys;

      // Create the table header
      const headerRow = headers.map((header: string, index: number) => (
        <th key={index}>{header}</th>
      ));
      table.push(<tr key="header">{headerRow}</tr>);

      const dataArray = keys.map((key) => data[key]);
      const maxRowCount = Math.max(
        ...dataArray.map((item) => (Array.isArray(item) ? item.length : 1))
      );

      for (let i = 0; i < maxRowCount; i++) {
        const row = keys.map((key) => {
          if (Array.isArray(data[key])) {
            if (typeof data[key][i] === "string") {
              return <td key={key}>{data[key][i]}</td>;
            } else if (typeof data[key][i] === "object") {
              // Recursively create subtables for nested JSON objects
              return <td key={key}>{createTableFromJSON(data[key][i])}</td>;
            }
          } else {
            return <td key={key}>{data[key]}</td>;
          }
        });
        table.push(<tr key={i}>{row}</tr>);
      }
    }
  }

  return table;
}
