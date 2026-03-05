import "./Stats.css"

export const Stats = () => {

  const stats = {
    cardsStudiedToday: 45,
    studyStreak: 7,
    totalCards: 320,
    decks: 5
  }

  return (
    <div className="stats-page">

      <h1>Statistics</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Cards Studied Today</h3>
          <p>{stats.cardsStudiedToday}</p>
        </div>

        <div className="stat-card">
          <h3>Study Streak</h3>
          <p>{stats.studyStreak} days</p>
        </div>

        <div className="stat-card">
          <h3>Total Cards</h3>
          <p>{stats.totalCards}</p>
        </div>

        <div className="stat-card">
          <h3>Total Decks</h3>
          <p>{stats.decks}</p>
        </div>

      </div>

    </div>
  )
}