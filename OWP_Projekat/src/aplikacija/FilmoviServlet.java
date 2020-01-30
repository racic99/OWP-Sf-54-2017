package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import model.Film;

public class FilmoviServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String nazivPretraga = request.getParameter("nazivPretraga");
		String zanrPretraga = request.getParameter("zanrPretraga");
		String trajanje1 = request.getParameter("trajanje1");
		String trajanje2 = request.getParameter("trajanje2");
		String distributer = request.getParameter("distributerPretraga");
		String zemljaPoreklaPretraga = request.getParameter("zemljaPoreklaPretraga");
		String godina1 = request.getParameter("godina1");
		String godina2 = request.getParameter("godina2");
		
		List<Film> filmovi = FilmDAO.getAll();
		List<Film> nazivPretrage = FilmDAO.getNaziv(nazivPretraga);
		List<Film> zanroviPretraga = FilmDAO.getZanrovi(zanrPretraga);
		List<Film> trajanjeOpseg = FilmDAO.getOpsegTrajanja(trajanje1, trajanje2);
		List<Film> distributeriPretraga = FilmDAO.getDistributeri(distributer);
		List<Film> zemljePoreklaPretraga = FilmDAO.getZemljaPorekla(zemljaPoreklaPretraga);
		List<Film> godinaOpseg = FilmDAO.getOpsegGodina(godina1, godina2);
		
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("filmovi", filmovi);
		data.put("nazivPretrage", nazivPretrage);
		data.put("zanroviPretraga", zanroviPretraga);
		data.put("trajanjeOpseg", trajanjeOpseg);
		data.put("distributeriPretraga", distributeriPretraga);
		data.put("zemljaPoreklaPretraga", zemljePoreklaPretraga);
		data.put("godinaOpseg", godinaOpseg);

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
