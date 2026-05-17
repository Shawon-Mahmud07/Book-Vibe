import { motion } from "framer-motion";
import { BookOpen, Clock, Trash2 } from "lucide-react";
import useListedBooks from "@/context/ListedBooksContext";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MotionDiv = motion.div;



// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl">
        <p className="text-sm font-semibold text-foreground">
          {payload[0].payload.fullTitle}
        </p>
        <p className="text-accent-green text-sm font-bold mt-1">
          {
            payload[0].value > 0
              ? `${payload[0].value} pages`
              : "Page count unavailable" 
          }
        </p>
      </div>
    );
  }
  return null;
};
// Status configuration for select options
const statusConfig = {
  "want-to-read": {
    label: "Want to Read",
    emoji: "📚",
    color: "text-accent-green bg-accent-green/10",
  },
  reading: {
    label: "Reading",
    emoji: "📖",
    color: "text-blue-500 bg-blue-500/10",
  },
  finished: {
    label: "Finished",
    emoji: "✅",
    color: "text-green-600 bg-green-600/10",
  },
};

const PagesToRead = () => {
  const { listedBooks, removeBook, setStatus, getStatus } = useListedBooks();

  // Count of books with known page counts
const knownPages = useMemo(
  () =>
    listedBooks
      .filter((b) => b.pageCount)
      .reduce((sum, b) => sum + b.pageCount, 0),
  [listedBooks],
);
// Count of books with unknown page counts
const unknownCount = useMemo(
  () => listedBooks.filter((b) => !b.pageCount).length,
  [listedBooks],
  );

  // Estimate days to finish based on known pages (assuming 30 pages/day)
const daysToFinish = knownPages > 0 ? Math.ceil(knownPages / 30) : null;

  // Chart data (only books with pageCount)
  const chartData = useMemo(
    () =>
      [...new Map(listedBooks.map((b) => [b.id, b])).values()]
        .filter((b) => b.pageCount) // ← only include books with known pages
        .map((b) => ({
          title: b.title.length > 12 ? b.title.slice(0, 12) + "…" : b.title,
          pages: b.pageCount,
          fullTitle: b.title,
        })),
    [listedBooks],
  );

  return (
    <div className="px-6 md:px-10 py-12 min-h-[60vh]">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-accent-green" />
          Pages to Read
        </h1>
        <p className="text-muted-foreground">Track your reading progress</p>
      </MotionDiv>

      {/* Empty State */}
      {listedBooks.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="bg-accent-green-light rounded-full p-6 mb-6">
            <BookOpen className="w-12 h-12 text-accent-green animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Reading list is empty
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Save books from the Home page to see your reading stats here.
          </p>
        </MotionDiv>
      )}

      {listedBooks.length > 0 && (
        <>
          {/* Stats Cards */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="bg-muted rounded-2xl p-5 text-center border border-border">
              <div className="text-3xl font-bold text-accent-green">
                {listedBooks.length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Books in List
              </div>
            </div>

            {/* If any book has unknown page count, show "~" before total pages */}
            {/* Total Pages Card */}
            <div className="bg-muted rounded-2xl p-5 text-center border border-border">
              <div className="text-3xl font-bold text-accent-green flex items-center justify-center gap-1">
                {unknownCount > 0 && (
                  <span className="text-lg text-yellow-500">~</span>
                )}
                {knownPages.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Pages
              </div>
              {unknownCount > 0 && (
                <div className="text-xs text-yellow-500 mt-1">
                  {unknownCount} book{unknownCount > 1 ? "s" : ""} page unknown
                </div>
              )}
            </div>

            {/* Days to Finish Card */}
            <div className="bg-muted rounded-2xl p-5 text-center border border-border">
              <div className="text-3xl font-bold text-accent-green">
                {daysToFinish ? `~${daysToFinish}` : "N/A"}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Days to Finish
              </div>
              {unknownCount > 0 && (
                <div className="text-xs text-yellow-500 mt-1">
                  based on known pages
                </div>
              )}
            </div>
          </MotionDiv>

          {/* Bar Chart */}
          {chartData.length > 0 && (
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 mb-10"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Pages per Book
              </h2>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="title"
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                  />
                  <Bar
                    dataKey="pages"
                    radius={[8, 8, 0, 0]}
                    fill="var(--accent-green)"
                    opacity={0.85}
                  />
                </BarChart>
              </ResponsiveContainer>
            </MotionDiv>
          )}

          {/* Book List */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your Reading List
            </h2>

            <div className="space-y-4">
              {listedBooks.map((book, index) => {
                const status = statusConfig[getStatus(book.id)];
                return (
                  <MotionDiv
                    key={book.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow duration-300 group relative"
                  >
                    {/* Cover and basic info row for mobile */}
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
                      {/* Cover */}
                      <div className="bg-muted rounded-xl w-14 h-20 shrink-0 overflow-hidden">
                        {book.cover ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate pr-6 sm:pr-0">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {book.authors?.[0] ?? "Unknown"}
                        </p>

                        {/* Progress bar info */}
                        {book.pageCount && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground shrink-0 font-medium">
                              {book.pageCount} pages
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controls: Select and Status */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-border/50">
                      <select
                        value={getStatus(book.id)}
                        onChange={(e) => setStatus(book.id, e.target.value)}
                        className="text-xs px-2 py-1.5 rounded-lg border border-border bg-muted text-foreground focus:ring-1 focus:ring-accent-green outline-none min-w-35"
                      >
                        <option value="want-to-read">📚 Want to Read</option>
                        <option value="reading">📖 Currently Reading</option>
                        <option value="finished">✅ Finished</option>
                      </select>

                      <div
                        className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full ${status.color}`}
                      >
                        <span>{status.emoji}</span>
                        {status.label}
                      </div>

                      <button
                        onClick={() => removeBook(book.id)}
                        className="absolute top-4 right-4 sm:static text-red-500 hover:bg-red-50 p-2 rounded-full transition-all duration-200 md:opacity-0 md:group-hover:opacity-100"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        </>
      )}
    </div>
  );
};

export default PagesToRead;
