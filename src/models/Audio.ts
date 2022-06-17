import prisma from "@ajoin/helpers/prisma";

interface Audio {
  name: string;
  url: string;
  author: string;
}

class AudioModel {
  async create(data: Audio) {
    await prisma.audio.create({ data });
  }

  async delete(id: number) {
    await prisma.audio.delete({ where: { id } });
  }
}

export default new AudioModel();
