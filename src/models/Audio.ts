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
  async upsert(data: Omit<Audio, "id">) {
    return await prisma.audio.upsert({
      create: data,
      update: {
        name: data.name,
        url: data.url,
      },
      where: { name_guildId: data },
    });
  }

  async create(data: Omit<Audio, "id">) {
    return await prisma.audio.create({ data });
  }

  async findOne(where: Partial<Audio>) {
    return await prisma.audio.findFirst({ where });
  }

  async deleteById(id: number) {
    return await prisma.audio.delete({
      where: { id },
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
