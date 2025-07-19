# Epic 2: Core Ability Implementation

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Product Requirements Document (PRD)" focusing on "Core Ability Implementation".

**Goal:** To allow users to interact with the character and trigger his primary, well-known abilities for an engaging experience.

**Story 2.1:** As a user, I want to press the 'Q' key to see Yasuo perform a sword thrust action so that I can feel like I'm using his main attack.

- **Acceptance Criteria:**
  1. Pressing the 'Q' key triggers a forward-thrusting animation.
  2. The animation plays smoothly to completion.

**Story 2.2:** As a user, I want to press the 'W' key to see a wind wall appear in front of Yasuo so that I can use his iconic defensive ability.

- **Acceptance Criteria:**
  1. Pressing the 'W' key instantiates a semi-transparent plane object in front of the character model.
  2. The wall persists for a short duration (e.g., 3-4 seconds) and then disappears.

**Story 2.3:** As a user, I want to press the 'E' key to see Yasuo dash a short distance so that I can experience his signature mobility.

- **Acceptance Criteria:**
  1. Pressing the 'E' key moves the character model forward a fixed distance over a short period.
  2. A simple particle effect or trail is left behind during the dash.
