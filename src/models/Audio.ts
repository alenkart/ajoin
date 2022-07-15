import prisma from "@ajoin/helpers/prisma";

interface Audio {
  id: number;
  name: string;
  url: string;
  guildId: string;
  authorId: string;
}

class AudioModel {
  async findOne(where: Partial<Audio>) {
    return await prisma.audio.findFirst({ where });
  }

  async create(data: Omit<Audio, "id">) {
    return await prisma.audio.create({ data });
  }

  async delete(id: number) {
    return await prisma.audio.delete({ where: { id } });
  }
}

export default new AudioModel();