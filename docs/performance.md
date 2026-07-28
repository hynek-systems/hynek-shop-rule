# Performance

Run the benchmark with:

```bash
vp run benchmark
```

The benchmark builds flat trees with 100, 1,000, and 10,000 rules and reports
the median of seven measurements for evaluation, serialization, and cloning.

Baseline measured on Node.js 24.18.0 on 2026-07-28:

|  Rules | Evaluate | Serialize |    Clone |
| -----: | -------: | --------: | -------: |
|    100 |  0.15 ms |   0.14 ms |  1.17 ms |
|  1,000 |  1.59 ms |   0.13 ms | 17.18 ms |
| 10,000 |  3.25 ms |   2.49 ms | 86.00 ms |

The 10,000-rule CI budgets are 250 ms for evaluation, 250 ms for serialization,
and 1,000 ms for cloning. They are deliberately wider than a single-machine
baseline to catch order-of-magnitude regressions without treating shared CI
runner noise as a product failure.

Cloning creates fresh node IDs and is expected to cost more than evaluation or
serialization. Change budgets only with a documented baseline from a supported
Node.js version.
