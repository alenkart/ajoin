import prisma from "@ajoin/helpers/prisma";

interface Audio {
  name: string;
  url: string;
}

class AudioModel {
  async create(data: Audio) {
    await prisma.audio.create({ data });
  }
}

export default new AudioModel();
