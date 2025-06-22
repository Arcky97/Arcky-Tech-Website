import { z } from "zod/v4";

export const guildSettingsSchema = z.object({
  guildId: z.string().length(19),
  chattingChannel: z.string().length(19).nullable(),
  messageLogging: z.string().length(19).nullable(), 
  messageConfig: z.object({
    all: z.boolean(),
    edits: z.boolean(),
    deletes: z.boolean(),
    bulks: z.boolean()
  }).default({ 
    all: true,
    edits: true, 
    deletes: true, 
    bulks: true 
  }),
  memberLogging: z.string().length(19).nullable(), 
  memberConfig: z.object({
    roles: z.object({
      all: z.boolean(),
      adds: z.boolean(),
      removes: z.boolean()
    }).default({
      all: true, 
      adds: true, 
      removes: true
    }),
    names: z.object({
      all: z.boolean(),
      users: z.boolean(),
      globals: z.boolean(),
      nicks: z.boolean()
    }).default({
      all: true,
      users: true,
      globals: true,
      nicks: true 
    }),
    avatars: z.object({
      all: z.boolean(),
      globals: z.boolean(),
      servers: z.boolean()
    }).default({
      all: true,
      globals: true,
      servers: true 
    }),
    bans: z.object({
      all: z.boolean(),
      adds: z.boolean(),
      removes: z.boolean()
    }).default({
      all: true,
      adds: true,
      removes: true 
    }),
    timeouts: z.object({
      all: z.boolean(),
      adds: z.boolean(),
      removes: z.boolean()
    }).default({
      all: true,
      adds: true,
      removes: true 
    })
  }),
  serverLogging: z.string().length(19).nullable(),
  serverConfig: z.object({
    channels: z.object({
      all: z.boolean(),
      creates: z.boolean(),
      updates: z.boolean(),
      removes: z.boolean() 
    }).default({
      all: true,
      creates: true,
      updates: true,
      removes: true 
    }),
    roles: z.object({
      all: z.boolean(),
      creates: z.boolean(),
      updates: z.boolean(),
      deletes: z.boolean()
    }).default({
      all: true, 
      creates: true,
      updates: true,
      deletes: true 
    }),
    updates: z.object({
      all: z.boolean()
    }).default({
      all: true 
    }),
    emojis: z.object({
      all: z.boolean(),
      creates: z.boolean(),
      updates: z.boolean(),
      deletes: z.boolean()
    }).default({
      all: true,
      creates: true,
      updates: true,
      deletes: true
    }),
    stickers: z.object({
      all: z.boolean(),
      creates: z.boolean(),
      updates: z.boolean(),
      deletes: z.boolean()
    }).default({
      all: true,
      creates: true,
      updates: true,
      deletes: true 
    })
  }),
  voiceLogging: z.string().length(19).nullable(),
  voiceConfig: z.object({
    joins: z.boolean(),
    moves: z.boolean(),
    leaves: z.boolean(),
    mutes: z.boolean(),
    unmutes: z.boolean(),
    deafens: z.boolean(),
    undeafens: z.boolean()
  }).default({
    joins: true,
    moves: true,
    leaves: true,
    mutes: true,
    unmutes: true,
    deafens: true,
    undeafens: true 
  }),
  joinLeaveLogging: z.string().length(19).nullable(),
  joinLeaveConfig: z.object({
    joins: z.boolean(),
    leaves: z.boolean()
  }).default({
    joins: true,
    leaves: true 
  }),
  moderationLogging: z.string().length(19).nullable(),
  moderationConfig: z.object({
    warns: z.object({
      all: z.boolean(),
      adds: z.boolean(),
      removes: z.boolean(),
      clears: z.boolean()
    }).default({
      all: true,
      adds: true, 
      removes: true,
      clears: true 
    }),
    mutes: z.object({
      all: z.boolean() 
    }).default({
      all: true 
    }),
    unmutes: z.object({
      all: z.boolean()
    }).default({
      all: true
    }),
    timeouts: z.object({
      all: z.boolean(),
      adds: z.boolean(),
      removes: z.boolean()
    }).default({
      all: true,
      adds: true,
      removes: true
    }),
    kicks: z.object({
      all: z.boolean()
    }).default({
      all: true 
    }),
    bans: z.object({
      all: z.boolean(),
      regulars: z.boolean(),
      softs: z.boolean(),
      temps: z.boolean()
    }).default({
      all: true,
      regulars: true,
      softs: true,
      temps: true
    }),
    unbans: z.object({
      all: z.boolean()
    }).default({
      all: true
    })
  }),
  reportLogging: z.string().length(19).nullable(),
  ignoreLogging: z.array(z.object().loose()).default([]),
  muteRole: z.string().length(19).nullable(),
  joinRoles: z.array(z.object().loose()).default([]),
  deletionData: z.date().nullable()
});

export type GuildSettings = z.infer<typeof guildSettingsSchema>;