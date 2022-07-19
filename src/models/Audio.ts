import prisma from "@ajoin/helpers/prisma";

interface Audio {
  id: number;
  name: string;
  url: string;
  guildId: string;
  authorId: string;
}

interface AudioDelete {
  name: string;
  guildId: string;
}

class AudioModel {
  async create(data: Omit<Audio, "id">) {
    return await prisma.audio.create({ data });
  }

  async findOne(where: Partial<Audio>) {
    return await prisma.audio.findFirst({ where });
  }

  async deleteBy({ name, guildId }: AudioDelete) {
    return await prisma.audio.delete({
      where: {
        name_guildId: { name, guildId },
      },
    });
  }

  async searchByName(name: string, where: Partial<Audio>) {
    return await prisma.audio.findMany({
      where: {
        ...where,
        name: {
          startsWith: name,
        },
      },
    });
  }
}

export default new AudioModel();
