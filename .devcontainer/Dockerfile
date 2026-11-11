FROM ghcr.io/terrapkg/builder:frawhide

ENV NO_UPDATE_NOTIFIER=1
ENV FORCE_COLOR=1
ARG PNPM_VERSION=$PNPM_VERSION
ARG USERNAME=$USERNAME
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Do not do this outside of a container for the love of God.
RUN groupadd --gid $USER_GID $USERNAME && \
useradd --uid $USER_UID --gid $USER_GID -m $USERNAME && \
dnf install -y sudo && \
echo "$USERNAME ALL = (ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USERNAME && \
mkdir -p /workspaces/docs && \
chown -R $USERNAME /workspaces/docs

USER 1000:1000
WORKDIR /workspaces/docs

# Copy the bare minimum for dep fetching
COPY ../package.json ../pnpm-lock.yaml .

RUN sudo dnf install -y pnpm${PNPM_VERSION} nodejs && \
pnpm ci
