export default function CustomTable<ColumnKey extends string>({ columns, rows }: {
    columns: { key: ColumnKey; name: string }[];
    rows: Record<ColumnKey, React.ReactNode>[];
}) {
    return (
        <table>
            <thead>
                <tr className="bg-white">
                    {columns.map((column) => (
                        <th className="p-2 border border-zinc-200 text-left" key={column.key}>
                            {column.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr className="odd:bg-black/4 even:bg-white" key={index}>
                        {columns.map((column) => (
                            <td className="p-2 border border-zinc-200" key={column.key}>
                                {row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
       </table>
    )
}
