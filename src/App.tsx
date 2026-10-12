import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Plus,
  Search,
  Settings,
  Target,
  Terminal,
  X,
} from "lucide-react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

type Project = {
  name: string;
  description: string;
  color: string;
  progress: number;
  label: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finish Java OOP assignment",
    project: "University",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Build DevHub dashboard UI",
    project: "DevHub",
    priority: "High",
    completed: false,
  },
  {
    id: 3,
    title: "Review database normalisation",
    project: "University",
    priority: "Medium",
    completed: true,
  },
  {
    id: 4,
    title: "Practise React components",
    project: "Learning",
    priority: "Low",
    completed: false,
  },
];

const projects: Project[] = [
  {
    name: "DevHub",
    description: "Personal developer dashboard",
    color: "#8b7cff",
    progress: 35,
    label: "In progress",
  },
  {
    name: "Student Hub",
    description: "A better campus experience",
    color: "#48c9b0",
    progress: 15,
    label: "Planning",
  },
  {
    name: "AI Study Buddy",
    description: "Smarter study sessions",
    color: "#e8ad63",
    progress: 8,
    label: "Exploring",
  },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Tasks", icon: ListTodo },
  { label: "Projects", icon: FolderKanban },
  { label: "Study Planner", icon: BookOpen },
  { label: "Goals", icon: Target },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskProject, setNewTaskProject] = useState("DevHub");
  const [newTaskPriority, setNewTaskPriority] =
      useState<Task["priority"]>("Medium");

  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate =
      tasks.length === 0
          ? 0
          : Math.round((completedTasks / tasks.length) * 100);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.project.toLowerCase().includes(search.toLowerCase());

      const matchesNav =
          activeNav !== "My Tasks" || !task.completed;

      return matchesSearch && matchesNav;
    });
  }, [tasks, search, activeNav]);

  function toggleTask(id: number) {
    setTasks((current) =>
        current.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
        ),
    );
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTaskTitle.trim();
    if (!title) return;

    const task: Task = {
      id: Date.now(),
      title,
      project: newTaskProject,
      priority: newTaskPriority,
      completed: false,
    };

    setTasks((current) => [task, ...current]);
    setNewTaskTitle("");
    setNewTaskProject("DevHub");
    setNewTaskPriority("Medium");
    setShowTaskForm(false);
  }

  const pageTitle =
      activeNav === "Overview" ? "Your workspace" : activeNav;

  return (
      <div className="app-shell">
        <aside className="sidebar">
          <a className="brand" href="#" onClick={() => setActiveNav("Overview")}>
          <span className="brand-icon">
            <Terminal size={21} />
          </span>
            <span>
            <strong>devhub</strong>
            <small>PERSONAL WORKSPACE</small>
          </span>
          </a>

          <div className="workspace-switcher">
            <div className="workspace-avatar">D</div>
            <div className="workspace-name">
              <strong>My workspace</strong>
              <span>Personal account</span>
            </div>
            <ChevronDown size={16} className="muted-icon" />
          </div>

          <div className="nav-label">WORKSPACE</div>
          <nav className="main-nav">
            {navigation.map(({ label, icon: Icon }) => (
                <button
                    key={label}
                    className={`nav-item ${activeNav === label ? "active" : ""}`}
                    onClick={() => setActiveNav(label)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {label === "My Tasks" && (
                      <span className="nav-count">
                  {tasks.filter((task) => !task.completed).length}
                </span>
                  )}
                </button>
            ))}
          </nav>

          <div className="sidebar-project-heading">
            <span className="nav-label">YOUR PROJECTS</span>
            <button
                className="icon-button small-button"
                aria-label="Add task"
                onClick={() => setShowTaskForm(true)}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="project-nav">
            {projects.map((project) => (
                <button
                    key={project.name}
                    className={`project-nav-item ${
                        activeNav === project.name ? "selected" : ""
                    }`}
                    onClick={() => setActiveNav(project.name)}
                >
              <span
                  className="project-dot"
                  style={{ backgroundColor: project.color }}
              />
                  {project.name}
                </button>
            ))}
          </div>

          <div className="sidebar-spacer" />

          <div className="sidebar-tip">
            <div className="tip-icon">
              <Code2 size={19} />
            </div>
            <strong>Keep building.</strong>
            <p>Small steps every day lead to great projects.</p>
            <span className="tip-footer">YOUR NEXT LEVEL STARTS HERE</span>
          </div>

          <button className="nav-item settings-button"
                  onClick={() => setActiveNav("Settings")}>
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="profile-avatar">Y</div>
            <div className="profile-info">
              <strong>Your name</strong>
              <span>Developer in progress</span>
            </div>
            <ChevronDown size={16} className="muted-icon" />
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div className="breadcrumb">
              <span>Workspace</span>
              <span className="breadcrumb-slash">/</span>
              <strong>{pageTitle}</strong>
            </div>

            <div className="topbar-actions">
              <label className="search-box">
                <Search size={16} />
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tasks..."
                    aria-label="Search tasks"
                />
                <kbd>⌘ K</kbd>
              </label>
              <button className="icon-button notification-button"
                      aria-label="Notifications">
                <Bell size={18} />
                <span />
              </button>
              <div className="topbar-avatar">Y</div>
            </div>
          </header>

          <div className="page-content">
            <section className="welcome-row">
              <div>
                <div className="eyebrow">
                  <span className="status-dot" />
                  YOUR PERSONAL COMMAND CENTRE
                </div>
                <h1>{pageTitle === "Your workspace" ? "Good evening." : pageTitle + "."}</h1>
                <p className="welcome-subtitle">
                  A little progress each day adds up to big results.
                </p>
              </div>
              <button
                  className="primary-button"
                  onClick={() => setShowTaskForm(true)}
              >
                <Plus size={17} />
                New task
              </button>
            </section>

            <section className="stats-grid">
              <StatCard
                  label="Total tasks"
                  value={String(tasks.length).padStart(2, "0")}
                  note="Across your workspace"
                  icon={<ListTodo size={19} />}
                  tone="purple"
                  trend={<><ArrowUpRight size={14} /> All your tasks</>}
              />
              <StatCard
                  label="Completed"
                  value={String(completedTasks).padStart(2, "0")}
                  note="Tasks you've finished"
                  icon={<Check size={19} />}
                  tone="green"
                  trend={<><ArrowUpRight size={14} /> Keep it up</>}
              />
              <StatCard
                  label="Active projects"
                  value={String(projects.length).padStart(2, "0")}
                  note="Ideas in progress"
                  icon={<FolderKanban size={19} />}
                  tone="blue"
                  trend={<><Activity size={14} /> Building momentum</>}
              />
              <StatCard
                  label="Task completion"
                  value={`${completionRate}%`}
                  note="Based on your task list"
                  icon={<Target size={19} />}
                  tone="orange"
                  trend={<><ArrowUpRight size={14} /> Your progress</>}
              />
            </section>

            <section className="dashboard-grid">
              <div className="panel tasks-panel">
                <div className="panel-header">
                  <div>
                    <h2>{activeNav === "My Tasks" ? "Open tasks" : "Today's tasks"}</h2>
                    <p>Your next steps, all in one place.</p>
                  </div>
                  <button
                      className="text-button"
                      onClick={() => setActiveNav("My Tasks")}
                  >
                    View tasks <ArrowRight size={15} />
                  </button>
                </div>

                {showTaskForm && (
                    <form className="task-form" onSubmit={addTask}>
                      <div className="form-heading">
                        <strong>Create a task</strong>
                        <button
                            type="button"
                            className="icon-button small-button"
                            onClick={() => setShowTaskForm(false)}
                            aria-label="Close form"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <input
                          autoFocus
                          value={newTaskTitle}
                          onChange={(event) => setNewTaskTitle(event.target.value)}
                          placeholder="What needs to get done?"
                          maxLength={120}
                          required
                      />
                      <div className="form-row">
                        <select
                            value={newTaskProject}
                            onChange={(event) => setNewTaskProject(event.target.value)}
                            aria-label="Task project"
                        >
                          <option>DevHub</option>
                          <option>University</option>
                          <option>Learning</option>
                          <option>Personal</option>
                        </select>
                        <select
                            value={newTaskPriority}
                            onChange={(event) =>
                                setNewTaskPriority(event.target.value as Task["priority"])
                            }
                            aria-label="Task priority"
                        >
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                        <button className="primary-button compact-button" type="submit">
                          Add task
                        </button>
                      </div>
                    </form>
                )}

                <div className="task-list">
                  {filteredTasks.length === 0 ? (
                      <div className="empty-state">
                        <ListTodo size={25} />
                        <strong>No matching tasks</strong>
                        <span>Add a task or try another search.</span>
                      </div>
                  ) : (
                      filteredTasks.map((task) => (
                          <div className="task-row" key={task.id}>
                            <button
                                className={`task-check ${task.completed ? "checked" : ""}`}
                                onClick={() => toggleTask(task.id)}
                                aria-label={
                                  task.completed ? "Mark task incomplete" : "Complete task"
                                }
                            >
                              {task.completed && <Check size={13} />}
                            </button>
                            <div className="task-details">
                        <span className={task.completed ? "task-done" : "task-title"}>
                          {task.title}
                        </span>
                              <span className="task-project">{task.project}</span>
                            </div>
                            <span className={`priority priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                          </div>
                      ))
                  )}
                </div>

                <button
                    className="add-task-link"
                    onClick={() => setShowTaskForm(true)}
                >
                  <Plus size={16} /> Add another task
                </button>
              </div>

              <div className="panel progress-panel">
                <div className="panel-header">
                  <div>
                    <h2>Weekly progress</h2>
                    <p>One step at a time.</p>
                  </div>
                  <button className="icon-button small-button" aria-label="Progress help">
                    <CircleHelp size={17} />
                  </button>
                </div>

                <div className="progress-summary">
                  <div>
                    <span className="progress-number">{completionRate}%</span>
                    <span className="progress-caption">tasks completed</span>
                  </div>
                  <div className="progress-change">
                    <ArrowUpRight size={15} /> Live
                  </div>
                </div>

                <div className="progress-track">
                  <div
                      className="progress-fill"
                      style={{ width: `${completionRate}%` }}
                  />
                </div>

                <div className="progress-meta">
                  <span>{completedTasks} completed</span>
                  <span>{tasks.length - completedTasks} remaining</span>
                </div>

                <div className="progress-divider" />

                <div className="focus-card">
                  <div className="focus-icon">
                    <Target size={20} />
                  </div>
                  <div>
                    <strong>Focus on consistency</strong>
                    <p>Complete your next task to keep moving forward.</p>
                  </div>
                </div>

                <div className="weekly-insight">
                  <div className="insight-icon"><ArrowDownRight size={17} /></div>
                  <p>
                    <strong>Build your momentum.</strong> Every completed task
                    brings your goals closer.
                  </p>
                </div>
              </div>
            </section>

            <section className="projects-section">
              <div className="section-heading">
                <div>
                  <h2>Your projects</h2>
                  <p>Things you're learning, making and building.</p>
                </div>
                <button
                    className="text-button"
                    onClick={() => setActiveNav("Projects")}
                >
                  All projects <ArrowRight size={15} />
                </button>
              </div>

              <div className="project-grid">
                {projects.map((project, index) => (
                    <button
                        className="project-card"
                        key={project.name}
                        onClick={() => setActiveNav(project.name)}
                    >
                      <div className="project-card-top">
                        <div
                            className="project-symbol"
                            style={{
                              color: project.color,
                              backgroundColor: `${project.color}18`,
                            }}
                        >
                          {index === 0 ? <Terminal size={21} /> :
                              index === 1 ? <FolderKanban size={21} /> :
                                  <BookOpen size={21} />}
                        </div>
                        <span className="project-menu">•••</span>
                      </div>
                      <div className="project-card-info">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                      </div>
                      <div className="project-progress-label">
                        <span>{project.label}</span>
                        <strong>{project.progress}%</strong>
                      </div>
                      <div className="project-progress-track">
                        <div
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor: project.color,
                            }}
                        />
                      </div>
                    </button>
                ))}
              </div>
            </section>

            <footer className="page-footer">
              <span><span className="footer-status" /> All systems operational</span>
              <span>Made for your next big idea <span className="footer-heart">♥</span></span>
              <span>DEVHUB · V1.0.0</span>
            </footer>
          </div>
        </main>
      </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  tone: string;
  trend: React.ReactNode;
};

function StatCard({ label, value, note, icon, tone, trend }: StatCardProps) {
  return (
      <article className="stat-card">
        <div className="stat-card-top">
          <span className={`stat-icon ${tone}`}>{icon}</span>
          <span className="stat-trend">{trend}</span>
        </div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        <div className="stat-note">{note}</div>
      </article>
  );
}

export default App;