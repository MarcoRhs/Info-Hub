export const PRESET_DATA = {
  Germany: {
    currency: "€",
    scenarios: {
      "DIY · Casual": {
        description:
          "Rough board at small private yards. Owner supplies grain, bedding extras and routine farrier trims.",
        categories: {
          Board: { annual: { withTax: 2400, preTax: 2016 }, monthly: { withTax: 200, preTax: 168 } },
          Feed: { annual: { withTax: 240, preTax: 224 }, monthly: { withTax: 20, preTax: 19 } },
          Bedding: { annual: { withTax: 0, preTax: 0 }, monthly: { withTax: 0, preTax: 0 } },
          Farrier: { annual: { withTax: 240, preTax: 202 }, monthly: { withTax: 20, preTax: 17 } },
          "Vet care": { annual: { withTax: 600, preTax: 505 }, monthly: { withTax: 50, preTax: 42 } },
          Insurance: { annual: { withTax: 380, preTax: 380 }, monthly: { withTax: 32, preTax: 32 } },
          Tack: { annual: { withTax: 300, preTax: 252 }, monthly: { withTax: 25, preTax: 21 } },
          Lessons: { annual: { withTax: 720, preTax: 605 }, monthly: { withTax: 60, preTax: 50 } },
          Transport: { annual: { withTax: 600, preTax: 505 }, monthly: { withTax: 50, preTax: 42 } },
          Worming: { annual: { withTax: 80, preTax: 67 }, monthly: { withTax: 7, preTax: 6 } },
          Vaccinations: { annual: { withTax: 70, preTax: 59 }, monthly: { withTax: 6, preTax: 5 } },
          Dental: { annual: { withTax: 175, preTax: 147 }, monthly: { withTax: 15, preTax: 12 } },
          "Stable supplies": { annual: { withTax: 330, preTax: 277 }, monthly: { withTax: 28, preTax: 23 } }
        }
      },
      "Full board · Competitive": {
        description:
          "Professional barn with full board, training rides, coaching and show travel to regional competitions.",
        categories: {
          Board: { annual: { withTax: 4800, preTax: 4034 }, monthly: { withTax: 400, preTax: 336 } },
          Feed: { annual: { withTax: 240, preTax: 224 }, monthly: { withTax: 20, preTax: 19 } },
          Farrier: { annual: { withTax: 1050, preTax: 882 }, monthly: { withTax: 88, preTax: 74 } },
          "Vet care": { annual: { withTax: 600, preTax: 505 }, monthly: { withTax: 50, preTax: 42 } },
          Insurance: { annual: { withTax: 560, preTax: 560 }, monthly: { withTax: 47, preTax: 47 } },
          Tack: { annual: { withTax: 300, preTax: 252 }, monthly: { withTax: 25, preTax: 21 } },
          Lessons: { annual: { withTax: 1800, preTax: 1513 }, monthly: { withTax: 150, preTax: 126 } },
          Shows: { annual: { withTax: 960, preTax: 807 }, monthly: { withTax: 80, preTax: 67 } },
          Transport: { annual: { withTax: 720, preTax: 605 }, monthly: { withTax: 60, preTax: 50 } },
          "Stable supplies": { annual: { withTax: 420, preTax: 353 }, monthly: { withTax: 35, preTax: 29 } }
        }
      }
    }
  },
  "United Kingdom": {
    currency: "£",
    scenarios: {
      "DIY · Casual": {
        description:
          "Self-care livery with turnout, access to arena and the owner handling feed and routine care.",
        categories: {
          Board: { annual: { withTax: 2400, preTax: 2000 }, monthly: { withTax: 200, preTax: 167 } },
          Feed: { annual: { withTax: 600, preTax: 571 }, monthly: { withTax: 50, preTax: 48 } },
          Farrier: { annual: { withTax: 300, preTax: 250 }, monthly: { withTax: 25, preTax: 21 } },
          "Vet care": { annual: { withTax: 500, preTax: 417 }, monthly: { withTax: 42, preTax: 35 } },
          Insurance: { annual: { withTax: 420, preTax: 420 }, monthly: { withTax: 35, preTax: 35 } },
          Lessons: { annual: { withTax: 600, preTax: 500 }, monthly: { withTax: 50, preTax: 42 } }
        }
      },
      "Full livery · Competitive": {
        description:
          "Full livery service including exercising, show preparation, travel and coaching.",
        categories: {
          Board: { annual: { withTax: 12000, preTax: 10000 }, monthly: { withTax: 1000, preTax: 833 } },
          Farrier: { annual: { withTax: 800, preTax: 667 }, monthly: { withTax: 67, preTax: 56 } },
          "Vet care": { annual: { withTax: 1000, preTax: 833 }, monthly: { withTax: 83, preTax: 69 } },
          Training: { annual: { withTax: 3600, preTax: 3000 }, monthly: { withTax: 300, preTax: 250 } },
          Shows: { annual: { withTax: 2000, preTax: 1667 }, monthly: { withTax: 167, preTax: 139 } },
          Tack: { annual: { withTax: 500, preTax: 417 }, monthly: { withTax: 42, preTax: 35 } },
          "Stable supplies": { annual: { withTax: 400, preTax: 333 }, monthly: { withTax: 33, preTax: 28 } }
        }
      }
    }
  },
  "United States": {
    currency: "$",
    regions: {
      Alabama: {
        scenarios: {
          "Full service · Casual": {
            description: "Mid-range full care board facility with trailering support and regular trims.",
            categories: {
              Board: { annual: { withTax: 4435, preTax: 4435 }, monthly: { withTax: 370, preTax: 370 } },
              Feed: { annual: { withTax: 2239, preTax: 2239 }, monthly: { withTax: 187, preTax: 187 } },
              Farrier: { annual: { withTax: 1326, preTax: 1326 }, monthly: { withTax: 111, preTax: 111 } },
              Dental: { annual: { withTax: 143, preTax: 143 }, monthly: { withTax: 12, preTax: 12 } },
              Insurance: { annual: { withTax: 520, preTax: 520 }, monthly: { withTax: 43, preTax: 43 } }
            }
          }
        }
      },
      "New York": {
        scenarios: {
          "Full service · Casual": {
            description: "High cost-of-living metro area barn with turnout, indoor arena and pro farrier.",
            categories: {
              Board: { annual: { withTax: 5862, preTax: 5862 }, monthly: { withTax: 489, preTax: 489 } },
              Feed: { annual: { withTax: 2848, preTax: 2848 }, monthly: { withTax: 237, preTax: 237 } },
              Farrier: { annual: { withTax: 1753, preTax: 1753 }, monthly: { withTax: 146, preTax: 146 } },
              Lessons: { annual: { withTax: 1800, preTax: 1800 }, monthly: { withTax: 150, preTax: 150 } },
              Shows: { annual: { withTax: 960, preTax: 960 }, monthly: { withTax: 80, preTax: 80 } }
            }
          }
        }
      },
      California: {
        scenarios: {
          "Full service · Coastal": {
            description: "Coastal boarding stable with premium hay and access to professional trainers.",
            categories: {
              Board: { annual: { withTax: 7200, preTax: 7200 }, monthly: { withTax: 600, preTax: 600 } },
              Feed: { annual: { withTax: 2815, preTax: 2815 }, monthly: { withTax: 234, preTax: 234 } },
              Farrier: { annual: { withTax: 1815, preTax: 1815 }, monthly: { withTax: 151, preTax: 151 } },
              Insurance: { annual: { withTax: 680, preTax: 680 }, monthly: { withTax: 57, preTax: 57 } }
            }
          }
        }
      }
    }
  }
};
