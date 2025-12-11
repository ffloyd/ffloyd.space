{
  description = "A Nix-flake-based Node.js/Bun development environment";

  inputs.nixpkgs.url = "github:nixos/nixpkgs?ref=master";

  outputs = inputs: let
    supportedSystems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];
    forEachSupportedSystem = f:
      inputs.nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = import inputs.nixpkgs {inherit system;};
        });
  in {
    formatter = forEachSupportedSystem ({pkgs}: pkgs.alejandra);
    devShells = forEachSupportedSystem ({pkgs}: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          # runtime
          bun 

          # LSP
          typescript-language-server
          svelte-language-server
          tailwindcss-language-server
          vscode-langservers-extracted

          # For LLMs (they like to write scripts sometimes)
          python3

          # deploy
          flyctl
        ];
      };
    });
  };
}
