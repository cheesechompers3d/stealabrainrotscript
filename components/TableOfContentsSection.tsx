import React from "react"

interface TOCItem {
  text: string
  id: string
  children?: TOCItem[]
}

interface TableOfContentsSectionProps {
  title: string
  items: TOCItem[]
}

const renderItems = (items: TOCItem[], level = 0) => (
  <ul className={level === 0 ? "mb-2" : "ml-6 list-disc"}>
    {items.map((item, idx) => (
      <li key={idx} className={level === 0 ? "mb-2" : ""}>
        <a
          href={`#${item.id}`}
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById(item.id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className={
            level === 0
              ? "font-bold text-green-700 hover:text-green-500 flex items-center"
              : level === 1
              ? "font-semibold text-blue-700 hover:text-blue-500 flex items-center"
              : "text-gray-800 hover:text-gray-600 flex items-center"
          }
        >
          <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
          <span className="border-b border-current pb-0.5">{item.text}</span>
        </a>
        {item.children && renderItems(item.children, level + 1)}
      </li>
    ))}
  </ul>
)

const TableOfContentsSection: React.FC<TableOfContentsSectionProps> = ({ title, items }) => (
  <section className="bg-white rounded-lg p-6 mb-8 shadow-lg border border-green-200">
    <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700"><span role="img" aria-label="toc">📑</span> {title}</h2>
    {renderItems(items)}
  </section>
)

export default TableOfContentsSection 