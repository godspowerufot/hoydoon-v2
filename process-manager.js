const { spawn } = require("child_process");

class ProcessManager {
    constructor() {
        this.processes = [];
        this.isShuttingDown = false;
    }

    start() {
        // Start the main Next.js application
        const app = spawn("node", ["server.js"], {
            stdio: "inherit",
            env: process.env,
        });

        this.processes = [app];

        // Handle process exits
        app.on("exit", (code, signal) => {
            console.error(
                `Next.js app exited with code ${code}, signal ${signal}`
            );
            if (!this.isShuttingDown) {
                this.shutdown(1);
            }
        });

        // Handle shutdown signals
        process.on("SIGTERM", () => {
            console.log("Received SIGTERM, shutting down gracefully");
            this.shutdown(0);
        });

        process.on("SIGINT", () => {
            console.log("Received SIGINT, shutting down gracefully");
            this.shutdown(0);
        });

        // Handle uncaught exceptions
        process.on("uncaughtException", (error) => {
            console.error("Uncaught exception:", error);
            this.shutdown(1);
        });

        process.on("unhandledRejection", (reason, promise) => {
            console.error(
                "Unhandled rejection at:",
                promise,
                "reason:",
                reason
            );
            this.shutdown(1);
        });

        console.log("Process manager started");
    }

    shutdown(exitCode) {
        if (this.isShuttingDown) return;

        this.isShuttingDown = true;
        console.log("Shutting down processes...");

        const shutdownPromises = this.processes.map((proc, index) => {
            return new Promise((resolve) => {
                if (proc.killed) {
                    resolve();
                    return;
                }

                const processName = "Next.js app";
                console.log(`Sending SIGTERM to ${processName}`);

                proc.kill("SIGTERM");

                const timeout = setTimeout(() => {
                    console.warn(`Force killing ${processName}`);
                    proc.kill("SIGKILL");
                    resolve();
                }, 10000); // 10 second graceful shutdown timeout

                proc.on("exit", () => {
                    clearTimeout(timeout);
                    console.log(`${processName} exited gracefully`);
                    resolve();
                });
            });
        });

        Promise.all(shutdownPromises).then(() => {
            console.log("All processes shut down.");
            process.exit(exitCode);
        });
    }
}

const processManager = new ProcessManager();
processManager.start();
