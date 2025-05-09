# Time Estimator

https://mattsegal.github.io/time-estimation/

Based on time estimation probability fromula proposed by Jacob Bayless in [Task estimation: Conquering Hofstadter's Law
](https://thesearesystems.substack.com/p/task-estimation-conquering-hofstadters)

```
Given a developer's estimated time m

P(t|m) = sqrt( exp( -1 * ( ln(t) - ln(m) )^2 ) / ( 2 * pi * t^2 ) )

```

## Commands

Uses Astro

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
