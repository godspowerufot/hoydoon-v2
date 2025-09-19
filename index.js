#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
// performance-analyzer.js
// Run with: node performance-analyzer.js

const fs = require("fs");
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { execSync } = require("child_process");

class NextJSPerformanceAnalyzer {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.issues = [];
    this.suggestions = [];
    this.stats = {
      totalFiles: 0,
      componentsAnalyzed: 0,
      pagesAnalyzed: 0,
      imagesFound: 0,
      bundleSize: null,
    };
  }

  // Main analysis function
  async analyze() {
    console.log("🔍 Starting Next.js Performance Analysis...\n");

    // Check if it's a Next.js project
    if (!this.isNextJSProject()) {
      console.error("❌ This doesn't appear to be a Next.js project");
      return;
    }

    // Run all analyses
    await this.analyzePages();
    await this.analyzeComponents();
    await this.analyzeImages();
    await this.analyzeImports();
    await this.analyzeConfig();
    await this.analyzeBundleSize();
    await this.analyzeCSS();

    // Generate report
    this.generateReport();
  }

  // Check if project is Next.js
  isNextJSProject() {
    const packagePath = path.join(this.projectPath, "package.json");
    if (!fs.existsSync(packagePath)) return false;

    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return packageJson.dependencies?.next || packageJson.devDependencies?.next;
  }

  // Analyze pages directory
  async analyzePages() {
    console.log("📄 Analyzing pages...");
    const pagesDir = path.join(this.projectPath, "pages");
    const appDir = path.join(this.projectPath, "app"); // App Router

    let targetDir = pagesDir;
    if (fs.existsSync(appDir)) {
      targetDir = appDir;
      console.log("   Using App Router structure");
    }

    if (!fs.existsSync(targetDir)) {
      this.addIssue("critical", "No pages or app directory found");
      return;
    }

    const files = this.getAllFiles(targetDir, [".js", ".jsx", ".ts", ".tsx"]);
    this.stats.pagesAnalyzed = files.length;

    files.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      this.analyzeFileContent(file, content, "page");
    });
  }

  // Analyze components directory
  async analyzeComponents() {
    console.log("🧩 Analyzing components...");
    const componentsDir = path.join(this.projectPath, "components");

    if (!fs.existsSync(componentsDir)) {
      this.addSuggestion(
        "medium",
        "Consider organizing components in a /components directory"
      );
      return;
    }

    const files = this.getAllFiles(componentsDir, [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ]);
    this.stats.componentsAnalyzed = files.length;

    files.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      this.analyzeFileContent(file, content, "component");
    });
  }

  // Analyze file content for performance issues
  analyzeFileContent(filePath, content, type) {
    const relativePath = path.relative(this.projectPath, filePath);

    // Check for unoptimized images
    const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    const imgMatches = content.match(imgTagRegex);
    if (imgMatches) {
      this.addIssue("high", `Unoptimized <img> tags found in ${relativePath}`, {
        file: relativePath,
        suggestion: "Replace with Next.js Image component",
        example: `import Image from 'next/image';\n<Image src="/image.jpg" alt="description" width={500} height={300} />`,
      });
    }

    // Check for missing lazy loading
    const heavyComponentRegex =
      /(import\s+\w+\s+from\s+['"][^'"]*(?:chart|map|editor|video|carousel))/gi;
    const heavyImports = content.match(heavyComponentRegex);
    if (
      heavyImports &&
      !content.includes("lazy(") &&
      !content.includes("dynamic(")
    ) {
      this.addIssue(
        "medium",
        `Heavy components without lazy loading in ${relativePath}`,
        {
          file: relativePath,
          suggestion: "Use dynamic imports for heavy components",
          example: `import dynamic from 'next/dynamic';\nconst HeavyComponent = dynamic(() => import('./HeavyComponent'), {\n  loading: () => <p>Loading...</p>\n});`,
        }
      );
    }

    // Check for useState without useCallback
    const useStateRegex = /useState\(/g;
    const useCallbackRegex = /useCallback\(/g;
    const useStateCount = (content.match(useStateRegex) || []).length;
    const useCallbackCount = (content.match(useCallbackRegex) || []).length;

    if (useStateCount > 3 && useCallbackCount === 0) {
      this.addIssue(
        "medium",
        `Multiple useState without useCallback in ${relativePath}`,
        {
          file: relativePath,
          suggestion: "Use useCallback to prevent unnecessary re-renders",
          example: `const handleClick = useCallback(() => {\n  // handler logic\n}, [dependency]);`,
        }
      );
    }

    // Check for inline styles
    const inlineStyleRegex = /style=\{\{[^}]+\}\}/g;
    const inlineStyles = content.match(inlineStyleRegex);
    if (inlineStyles && inlineStyles.length > 3) {
      this.addIssue("low", `Multiple inline styles in ${relativePath}`, {
        file: relativePath,
        suggestion: "Move to CSS modules or styled-components",
        example: `// styles.module.css\n.container { /* styles */ }\n\n// Component\nimport styles from './styles.module.css';\n<div className={styles.container}>`,
      });
    }

    // Check for missing React.memo
    const componentRegex =
      /(?:export\s+(?:default\s+)?(?:const|function)\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>)/;
    const memoRegex = /React\.memo|memo\(/;
    if (
      componentRegex.test(content) &&
      !memoRegex.test(content) &&
      type === "component"
    ) {
      this.addSuggestion(
        "medium",
        `Consider using React.memo for ${relativePath}`,
        {
          file: relativePath,
          suggestion:
            "Wrap component with React.memo to prevent unnecessary re-renders",
          example: `import { memo } from 'react';\n\nconst Component = memo(() => {\n  // component logic\n});\n\nexport default Component;`,
        }
      );
    }

    // Check for large bundle imports
    const largeLibraryRegex =
      /(import.*from\s+['"](?:lodash|moment|@material-ui|antd)['"])/g;
    const largeImports = content.match(largeLibraryRegex);
    if (largeImports) {
      this.addIssue("high", `Large library imports in ${relativePath}`, {
        file: relativePath,
        suggestion: "Use tree-shaking or import only needed parts",
        example: `// Instead of: import _ from 'lodash'\n// Use: import debounce from 'lodash/debounce'`,
      });
    }

    // Check for missing alt tags in Next.js Image
    const nextImageRegex = /<Image[^>]+>/g;
    const imageComponents = content.match(nextImageRegex) || [];
    imageComponents.forEach((img) => {
      if (!img.includes("alt=")) {
        this.addIssue(
          "medium",
          `Missing alt attribute in Image component in ${relativePath}`,
          {
            file: relativePath,
            suggestion: "Add alt attribute for accessibility and SEO",
            example: `<Image src="/image.jpg" alt="Descriptive text" width={500} height={300} />`,
          }
        );
      }
    });
  }

  // Analyze images directory
  async analyzeImages() {
    console.log("🖼️  Analyzing images...");
    const imagesDirs = ["public/images", "public", "assets/images", "assets"];

    for (const dir of imagesDirs) {
      const fullPath = path.join(this.projectPath, dir);
      if (fs.existsSync(fullPath)) {
        const images = this.getAllFiles(fullPath, [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".webp",
          ".avif",
        ]);
        this.stats.imagesFound += images.length;

        images.forEach((img) => {
          const stats = fs.statSync(img);
          const sizeInMB = stats.size / (1024 * 1024);
          const relativePath = path.relative(this.projectPath, img);

          if (sizeInMB > 1) {
            this.addIssue(
              "high",
              `Large image file: ${relativePath} (${sizeInMB.toFixed(2)}MB)`,
              {
                file: relativePath,
                suggestion: "Compress image or use Next.js Image optimization",
                example:
                  "Use tools like ImageOptim, TinyPNG, or next-optimized-images",
              }
            );
          }

          if (
            img.endsWith(".png") &&
            !img.includes("icon") &&
            !img.includes("logo")
          ) {
            this.addSuggestion(
              "low",
              `Consider converting PNG to WebP: ${relativePath}`,
              {
                file: relativePath,
                suggestion: "Use WebP format for better compression",
                example:
                  "Convert using online tools or next-optimized-images plugin",
              }
            );
          }
        });
      }
    }
  }

  // Analyze imports and dependencies
  async analyzeImports() {
    console.log("📦 Analyzing dependencies...");
    const packagePath = path.join(this.projectPath, "package.json");

    if (!fs.existsSync(packagePath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check for heavy dependencies
    const heavyDeps = ["moment", "lodash", "@material-ui/core", "antd"];
    heavyDeps.forEach((dep) => {
      if (dependencies[dep]) {
        this.addIssue("medium", `Heavy dependency detected: ${dep}`, {
          suggestion: "Consider lighter alternatives",
          alternatives: {
            moment: "date-fns or dayjs",
            lodash: "Individual lodash functions or native JS",
            "@material-ui/core": "@mui/material with tree-shaking",
            antd: "Individual component imports",
          }[dep],
        });
      }
    });

    // Check for missing performance dependencies
    const performanceDeps = [
      "next-pwa",
      "@next/bundle-analyzer",
      "webpack-bundle-analyzer",
    ];
    performanceDeps.forEach((dep) => {
      if (!dependencies[dep]) {
        this.addSuggestion(
          "low",
          `Consider adding ${dep} for better performance insights`
        );
      }
    });
  }

  // Analyze Next.js configuration
  async analyzeConfig() {
    console.log("⚙️  Analyzing Next.js config...");
    const configPath = path.join(this.projectPath, "next.config.js");

    if (!fs.existsSync(configPath)) {
      this.addIssue("medium", "No next.config.js found", {
        suggestion: "Create next.config.js for optimization settings",
        example: `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};
module.exports = nextConfig;`,
      });
      return;
    }

    const configContent = fs.readFileSync(configPath, "utf8");

    if (!configContent.includes("compress")) {
      this.addSuggestion("medium", "Enable compression in next.config.js", {
        example: "compress: true",
      });
    }

    if (!configContent.includes("images")) {
      this.addSuggestion(
        "medium",
        "Configure image optimization in next.config.js",
        {
          example: `images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}`,
        }
      );
    }
  }

  // Analyze bundle size
  async analyzeBundleSize() {
    console.log("📊 Analyzing bundle size...");

    try {
      // Check if .next directory exists (built project)
      const nextDir = path.join(this.projectPath, ".next");
      if (fs.existsSync(nextDir)) {
        const buildManifest = path.join(nextDir, "build-manifest.json");
        if (fs.existsSync(buildManifest)) {
          const manifest = JSON.parse(fs.readFileSync(buildManifest, "utf8"));

          // Analyze main bundle size
          Object.entries(manifest.pages).forEach(([page, files]) => {
            const jsFiles = files.filter((f) => f.endsWith(".js"));
            if (jsFiles.length > 5) {
              this.addIssue(
                "medium",
                `Page ${page} has many JS chunks (${jsFiles.length})`,
                {
                  suggestion: "Consider code splitting and lazy loading",
                }
              );
            }
          });
        }
      } else {
        this.addSuggestion("low", "Build your project to analyze bundle size", {
          example: "Run: npm run build",
        });
      }
    } catch (error) {
      console.log("   Could not analyze bundle size");
    }
  }

  // Analyze CSS
  async analyzeCSS() {
    console.log("🎨 Analyzing CSS...");
    const cssFiles = this.getAllFiles(this.projectPath, [
      ".css",
      ".scss",
      ".sass",
    ]);

    if (cssFiles.length === 0) {
      this.addSuggestion(
        "low",
        "Consider using CSS Modules or styled-components for better performance"
      );
      return;
    }

    cssFiles.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(this.projectPath, file);

      // Check for unused CSS (basic check)
      if (content.length > 10000) {
        this.addSuggestion("medium", `Large CSS file: ${relativePath}`, {
          suggestion:
            "Consider splitting into smaller modules or using PurgeCSS",
        });
      }

      // Check for !important usage
      const importantCount = (content.match(/!important/g) || []).length;
      if (importantCount > 5) {
        this.addIssue(
          "low",
          `Excessive !important usage in ${relativePath} (${importantCount})`,
          {
            suggestion: "Refactor CSS specificity instead of using !important",
          }
        );
      }
    });
  }

  // Utility functions
  getAllFiles(dir, extensions) {
    const files = [];

    if (!fs.existsSync(dir)) return files;

    const scan = (currentDir) => {
      const items = fs.readdirSync(currentDir);

      items.forEach((item) => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (
          stat.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          scan(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (extensions.includes(ext)) {
            files.push(fullPath);
            this.stats.totalFiles++;
          }
        }
      });
    };

    scan(dir);
    return files;
  }

  addIssue(severity, message, details = {}) {
    this.issues.push({
      severity,
      message,
      type: "issue",
      ...details,
    });
  }

  addSuggestion(priority, message, details = {}) {
    this.suggestions.push({
      priority,
      message,
      type: "suggestion",
      ...details,
    });
  }

  // Generate comprehensive report
  generateReport() {
    console.log("\n" + "=".repeat(60));
    console.log("📋 PERFORMANCE ANALYSIS REPORT");
    console.log("=".repeat(60));

    // Statistics
    console.log("\n📊 Project Statistics:");
    console.log(`   Total Files Analyzed: ${this.stats.totalFiles}`);
    console.log(`   Pages: ${this.stats.pagesAnalyzed}`);
    console.log(`   Components: ${this.stats.componentsAnalyzed}`);
    console.log(`   Images: ${this.stats.imagesFound}`);

    // Critical Issues
    const criticalIssues = this.issues.filter((i) => i.severity === "critical");
    if (criticalIssues.length > 0) {
      console.log("\n🚨 CRITICAL ISSUES:");
      criticalIssues.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.message}`);
        if (issue.suggestion) console.log(`   💡 ${issue.suggestion}`);
        if (issue.example)
          console.log(
            `   📝 Example:\n${issue.example
              .split("\n")
              .map((line) => "      " + line)
              .join("\n")}`
          );
      });
    }

    // High Priority Issues
    const highIssues = this.issues.filter((i) => i.severity === "high");
    if (highIssues.length > 0) {
      console.log("\n🔴 HIGH PRIORITY ISSUES:");
      highIssues.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.message}`);
        if (issue.suggestion) console.log(`   💡 ${issue.suggestion}`);
        if (issue.example)
          console.log(
            `   📝 Example:\n${issue.example
              .split("\n")
              .map((line) => "      " + line)
              .join("\n")}`
          );
      });
    }

    // Medium Priority Issues
    const mediumIssues = this.issues.filter((i) => i.severity === "medium");
    if (mediumIssues.length > 0) {
      console.log("\n🟡 MEDIUM PRIORITY ISSUES:");
      mediumIssues.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.message}`);
        if (issue.suggestion) console.log(`   💡 ${issue.suggestion}`);
        if (issue.example)
          console.log(
            `   📝 Example:\n${issue.example
              .split("\n")
              .map((line) => "      " + line)
              .join("\n")}`
          );
      });
    }

    // Suggestions
    if (this.suggestions.length > 0) {
      console.log("\n💡 OPTIMIZATION SUGGESTIONS:");
      this.suggestions.forEach((suggestion, i) => {
        console.log(`\n${i + 1}. ${suggestion.message}`);
        if (suggestion.suggestion)
          console.log(`   💡 ${suggestion.suggestion}`);
        if (suggestion.example)
          console.log(
            `   📝 Example:\n${suggestion.example
              .split("\n")
              .map((line) => "      " + line)
              .join("\n")}`
          );
        if (suggestion.alternatives)
          console.log(`   🔄 Alternative: ${suggestion.alternatives}`);
      });
    }

    // Quick Fixes
    console.log("\n⚡ QUICK WINS (Easy fixes with high impact):");
    console.log("1. Replace <img> tags with Next.js Image component");
    console.log("2. Add lazy loading to heavy components");
    console.log("3. Compress large images");
    console.log("4. Enable gzip compression in next.config.js");
    console.log("5. Add proper alt attributes to images");

    // Action Plan
    console.log("\n🎯 RECOMMENDED ACTION PLAN:");
    console.log("1. Fix critical issues first");
    console.log("2. Implement lazy loading for components below the fold");
    console.log("3. Optimize images (compress and convert to WebP)");
    console.log("4. Add React.memo to frequently re-rendering components");
    console.log("5. Implement code splitting for heavy dependencies");
    console.log("6. Configure next.config.js for optimal performance");

    // Summary
    const totalIssues = this.issues.length;
    const totalSuggestions = this.suggestions.length;
    console.log("\n📈 SUMMARY:");
    console.log(`   Issues Found: ${totalIssues}`);
    console.log(`   Suggestions: ${totalSuggestions}`);
    console.log(`   Estimated Impact: ${this.calculateImpact()}`);

    console.log("\n✅ Analysis Complete! Address issues in order of severity.");
    console.log(
      "💡 Pro tip: Focus on lazy loading and image optimization for immediate gains.\n"
    );
  }

  calculateImpact() {
    const criticalCount = this.issues.filter(
      (i) => i.severity === "critical"
    ).length;
    const highCount = this.issues.filter((i) => i.severity === "high").length;
    const mediumCount = this.issues.filter(
      (i) => i.severity === "medium"
    ).length;

    const score = criticalCount * 3 + highCount * 2 + mediumCount * 1;

    if (score > 10) return "High Impact Expected";
    if (score > 5) return "Medium Impact Expected";
    return "Low-Medium Impact Expected";
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const projectPath = args[0] || process.cwd();

  console.log("🚀 Next.js Performance Analyzer v1.0");
  console.log(`📁 Analyzing project: ${projectPath}\n`);

  const analyzer = new NextJSPerformanceAnalyzer(projectPath);
  analyzer.analyze().catch(console.error);
}

module.exports = NextJSPerformanceAnalyzer;

// Package.json script addition:
// "scripts": {
//   "analyze": "node performance-analyzer.js",
//   "analyze:verbose": "node performance-analyzer.js --verbose"
// }

// Usage Examples:
//
// Basic usage:
// node performance-analyzer.js
//
// Analyze specific directory:
// node performance-analyzer.js ./my-nextjs-app
//
// With npm script:
// npm run analyze
//
// Sample Output Structure:
//
// 🚨 CRITICAL ISSUES:
// 1. Unoptimized <img> tags found in pages/index.js
//    💡 Replace with Next.js Image component
//    📝 Example:
//       import Image from 'next/image';
//       <Image src="/image.jpg" alt="description" width={500} height={300} />
//
// 🔴 HIGH PRIORITY ISSUES:
// 1. Large image file: public/hero.jpg (2.3MB)
//    💡 Compress image or use Next.js Image optimization
//
// 🟡 MEDIUM PRIORITY ISSUES:
// 1. Heavy components without lazy loading in components/Chart.js
//    💡 Use dynamic imports for heavy components
//    📝 Example:
//       import dynamic from 'next/dynamic';
//       const Chart = dynamic(() => import('./Chart'), {
//         loading: () => <p>Loading...</p>
//       });
//
// 💡 OPTIMIZATION SUGGESTIONS:
// 1. Consider using React.memo for components/UserCard.js
//    💡 Wrap component with React.memo to prevent unnecessary re-renders
//
// ⚡ QUICK WINS (Easy fixes with high impact):
// 1. Replace <img> tags with Next.js Image component
// 2. Add lazy loading to heavy components
// 3. Compress large images
// 4. Enable gzip compression in next.config.js
//
// 🎯 RECOMMENDED ACTION PLAN:
// 1. Fix critical issues first
// 2. Implement lazy loading for components below the fold
// 3. Optimize images (compress and convert to WebP)
// 4. Add React.memo to frequently re-rendering components
