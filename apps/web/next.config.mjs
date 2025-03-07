import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: false,
  },
  // ... Other Nextra config options
});

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  transpilePackages: ["@workspace/ui"],
  // ... Other Next.js config options
});
